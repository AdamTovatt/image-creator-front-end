export function formatLayerName(layerName: string): string {
  // Remove special characters $ and @ from the start
  let formattedName = layerName.replace(/^[$@]+/, "");

  // Convert snake_case or kebab-case to PascalCase
  formattedName = formattedName
    .replace(/[_-]+(.)/g, (_, char) => char.toUpperCase()) // Convert _ or - followed by a character to uppercase
    .replace(/^[a-z]/, (char) => char.toUpperCase()); // Capitalize the first character

  // Insert spaces for PascalCasing
  formattedName = formattedName.replace(/([a-z])([A-Z])/g, "$1 $2");

  return formattedName;
}

// Example usage:
// console.log(formatLayerName("$some_layer-name")); // "Some Layer Name"
// console.log(formatLayerName("@camelCasing"));     // "Camel Casing"
// console.log(formatLayerName("PascalCaseExample")); // "Pascal Case Example"
