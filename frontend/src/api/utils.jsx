export function img2base64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function getTotalBeds(listing) {
  if (!listing.metadata?.bedrooms) return 0;
  return listing.metadata.bedrooms.reduce((total, bedroom) => {
    const bedroomBedCount = (bedroom.beds || []).reduce((sum, bed) => sum + (bed.count || 1), 0);
    return total + bedroomBedCount;
  }, 0);
}
