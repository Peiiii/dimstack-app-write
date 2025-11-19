export function getCurrentDomain(): string {
  if (typeof window === 'undefined') {
    return 'localhost';
  }
  return window.location.hostname;
}

export function getOAuthConfigKey(): string {
  const domain = getCurrentDomain();
  
  if (domain === 'localhost' || domain === '127.0.0.1') {
    return 'Localhost5173';
  }
  
  if (domain === 'gitary.app' || domain === 'www.gitary.app') {
    return 'GitaryApp';
  }
  
  if (domain === 'write.dimstack.com' || domain === 'www.write.dimstack.com') {
    return 'WriteDimstackCom';
  }
  
  return 'WriteDimstackCom';
}

export function isProductionDomain(): boolean {
  const domain = getCurrentDomain();
  return domain === 'gitary.app' || 
         domain === 'www.gitary.app' || 
         domain === 'write.dimstack.com' || 
         domain === 'www.write.dimstack.com';
}

export function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'https://write.dimstack.com';
  }
  
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : '';
  
  return `${protocol}//${hostname}${port}`;
}

