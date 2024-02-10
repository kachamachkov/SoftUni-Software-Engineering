class OnlineShop {
  warehouseSpace;
  products = [];
  sales = [];

  constructor(warehouseSpace) {
    this.warehouseSpace = warehouseSpace;
  }

  loadingStore(product, quantity, spaceRequired) {
    if (this.warehouseSpace < spaceRequired) {
      throw new Error('Not enough space in the warehouse.');
    }
    this.products.push({ product, quantity });

    this.warehouseSpace -= spaceRequired;

    return `The ${product} has been successfully deliver in the warehouse.`;
  }

  quantityCheck(product, minimalQuantity) {
    const data = this.findProduct(product);

    if (!data) {
      throw new Error(`There is no ${product} in the warehouse.`);
    }

    if (minimalQuantity <= 0) {
      throw new Error('The quantity cannot be zero or negative.');
    }

    if (data.quantity >= minimalQuantity) {
      return `You have enough from the product ${product}.`;
    } else {
      const differnce = minimalQuantity - data.quantity;
      data.quantity = minimalQuantity;
      return `You added ${differnce} more from the ${product} products.`;
    }
  }

  sellProduct(product) {
    const data = this.findProduct(product);

    data.quantity--;
    this.sales.push({
      product,
      quantity: 1,
    });

    return `The ${product} has been successfully sold.`;
  }

  findProduct(product) {
    const data = this.products.find((p) => p.product == product);

    if (!data) {
      throw new Error(`There is no ${product} in the warehouse.`);
    }

    return data;
  }

  revision() {
    if (this.sales.length == 0) {
      throw new Error('There are no sales today!');
    }

    const result = [
      `You sold ${sales} products today!`,
      'Products in the warehouse:',
    ];

    for (let { product, quantity } of this.products) {
      result.push(`${product}-${quantity} more left`);
    }
  }
}

const myOnlineShop = new OnlineShop(500);
console.log(myOnlineShop.loadingStore('headphones', 10, 200));
console.log(myOnlineShop.loadingStore('laptop', 5, 200));
console.log(myOnlineShop.loadingStore('TV', 40, 500));