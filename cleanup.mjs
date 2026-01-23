// cleanup.mjs
// 在cleanup 中列出 KV 命名空间，可以考虑使用 Cloudflare API 直接调用：
import fetch from 'node-fetch';

async function listKVNamespaces() {
  const accountId = process.env.CF_ACCOUNT_ID;
  const apiToken = process.env.CF_API_TOKEN;
  
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces`,
    {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.result;
}

async function main() {
  try {
    const namespaces = await listKVNamespaces();
    console.log('KV Namespaces:', namespaces);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
