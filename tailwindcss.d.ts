declare module "tailwindcss/lib/util/flattenColorPalette" {
  const flattenColorPalette: (theme: any) => Record<string, string>;
  export default flattenColorPalette;
}
