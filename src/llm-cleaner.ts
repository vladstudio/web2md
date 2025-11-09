const PROMPT = `Clean this markdown by removing:
- Navigation menus, sidebars, footers, headers
- Advertisements, popups, banners
- Social media widgets, share buttons
- Cookie notices, newsletter signups

Keep:
- Essential article/page content
- Headings and document structure
- Important formatting (bold, italic, lists)
- Link text (remove URLs, keep descriptive text)

Return only the cleaned markdown without explanation.`;

const MODELS = {
  anthropic: ['claude-3-5-haiku-20241022', 'claude-3-haiku-20240307', 'claude-haiku-4-5'],
  gemini: ['gemini-2.5-flash-lite', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'],
  openai: ['gpt-4o-mini', 'gpt-4.1-nano', 'gpt-3.5-turbo']
};

export async function cleanMarkdown(markdown: string, config: string): Promise<string> {
  const [provider, model] = config.split(':');

  if (!MODELS[provider as keyof typeof MODELS]?.includes(model)) {
    throw new Error(`Invalid provider:model - ${config}`);
  }

  const key = process.env[`${provider.toUpperCase()}_API_KEY`];
  if (!key) throw new Error(`Missing ${provider.toUpperCase()}_API_KEY`);

  const apis = {
    anthropic: async () => {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model, max_tokens: 4096, messages: [{ role: 'user', content: `${PROMPT}\n\n${markdown}` }] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`Anthropic API: ${data.error?.message || res.statusText}`);
      return data.content[0].text;
    },
    gemini: async () => {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: `${PROMPT}\n\n${markdown}` }] }] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`Gemini API: ${data.error?.message || res.statusText}`);
      return data.candidates[0].content.parts[0].text;
    },
    openai: async () => {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'authorization': `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: `${PROMPT}\n\n${markdown}` }] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`OpenAI API: ${data.error?.message || res.statusText}`);
      return data.choices[0].message.content;
    }
  };

  return await apis[provider as keyof typeof apis]();
}
