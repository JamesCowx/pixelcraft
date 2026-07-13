export interface Filter { name: string; params: Record<string, number>; }
export function applyGaussianBlur(imageData: ImageData, radius: number): ImageData {
  const size = radius * 2 + 1; const kernel = new Float32Array(size * size); let sum = 0; const sigma = radius / 2;
  for (let y = -radius; y <= radius; y++) { for (let x = -radius; x <= radius; x++) { const value = Math.exp(-(x * x + y * y) / (2 * sigma * sigma)); kernel[(y + radius) * size + (x + radius)] = value; sum += value; } }
  for (let i = 0; i < kernel.length; i++) kernel[i] /= sum;
  return convolve(imageData, kernel, size);
}
export function applyBrightnessContrast(imageData: ImageData, brightness: number, contrast: number): ImageData {
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  const result = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
  for (let i = 0; i < result.data.length; i += 4) { for (let j = 0; j < 3; j++) { result.data[i + j] = Math.max(0, Math.min(255, factor * (result.data[i + j] - 128) + 128 + brightness)); } }
  return result;
}
function convolve(imageData: ImageData, kernel: Float32Array, kernelSize: number): ImageData {
  const result = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
  const half = Math.floor(kernelSize / 2);
  for (let y = half; y < imageData.height - half; y++) { for (let x = half; x < imageData.width - half; x++) { let r = 0, g = 0, b = 0, a = 0; for (let ky = -half; ky <= half; ky++) { for (let kx = -half; kx <= half; kx++) { const idx = ((y + ky) * imageData.width + (x + kx)) * 4; const kIdx = (ky + half) * kernelSize + (kx + half); r += imageData.data[idx] * kernel[kIdx]; g += imageData.data[idx + 1] * kernel[kIdx]; b += imageData.data[idx + 2] * kernel[kIdx]; } } const outIdx = (y * imageData.width + x) * 4; result.data[outIdx] = Math.max(0, Math.min(255, r)); result.data[outIdx + 1] = Math.max(0, Math.min(255, g)); result.data[outIdx + 2] = Math.max(0, Math.min(255, b)); result.data[outIdx + 3] = imageData.data[outIdx + 3]; } }
  return result;
}
