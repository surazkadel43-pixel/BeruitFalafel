export enum ItemType  {
  Product =  1,
  Catering = 2,
  Both = 3,
  None = 4
};

export const getProductType = (product: ItemType) => {
  switch (product) {
    case ItemType.Product:
      return "Product";
    case ItemType.Catering:
      return "Catering";
    case ItemType.Both:
      return "Both";
    default:
      return "None";
  }
}
  
export const getProductTypeById = (productId: number) => {
  switch (productId) {
    case 1:
      return ItemType.Product;
    case 2:
      return ItemType.Catering;
    case 3:
      return ItemType.Both;
    default:
      return ItemType.None;
  }
}

export const getProductText = (productId: number) => {
  switch (productId) {
    case 1:
      return "Product";	
    case 2:
      return "Catering";	
    case 3:
      return "Both";
    default:
      return "None";
  }
}