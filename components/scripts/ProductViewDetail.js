//ProductViewDetail.js

const getProdDetHtml = (product) => {

  const flagsArr = product.getFlags();
  let flagsStr = '';
  flagsArr.forEach(flag => {
    flagsStr += '<span class="product-flag">' + flag + '</span>';
  });

  let messagesStr = '';
  product.messages.forEach(message => {
    messagesStr += message + '<br>'
  });

  let prodDetHtml = `
    <div class="details-img-wrapper">
      <img src="${product.hero}"> 
    </div>

    <div class="details-txt-wrapper">
      <div class="txt-justifier">
        <div class="product-title">
            <h2>${product.name}</h2>
        </div>

        <div class="product-flags-list">
          ${flagsStr}
        </div>

        <div class="price-range-list">
          <div class="price-range-regular">
            ${product.getPriceRangeRegular()}
          </div>

          <div class="price-range-selling">
            ${product.getPriceRangeSelling()}
          </div>
        </div>

        <div class="product-messages">
          ${messagesStr}
        </div>
      </div>
    </div>
  `;

  return prodDetHtml;
}