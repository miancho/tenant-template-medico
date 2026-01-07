import tenantConfig from '../../tenant.config.json'

export type TenantConfig = typeof tenantConfig

export const siteConfig = tenantConfig

export function getActiveSecctions() {
  const { secciones } = siteConfig

  return Object.entries(secciones)
    .filter(([_, section]) => section.activo)
    .sort((a, b) => a[1].orden - b[1].orden)
    .map(([key, section]) => ({ key, ...section }))
}
