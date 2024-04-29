fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("couldn't fetch resource");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const productDetails = data.product;
    document.getElementById("productVendor").innerHTML = productDetails.vendor;
    document.getElementById("productTitle").innerHTML = productDetails.title;
    document.getElementById("price").innerHTML = productDetails.price;
    document.getElementById("comparePrice").innerHTML =
      productDetails.compare_at_price;
    document.getElementById("description").innerHTML =
      productDetails.description;

    // discountPercent----------------------------------------------------------------

    const discountPercent = Math.round(
      ((productDetails.compare_at_price.substring(1) -
        productDetails.price.substring(1)) /
        productDetails.compare_at_price.substring(1)) *
        100
    );
    // console.log(discountPercent);
    document.getElementById("discount").textContent = `${discountPercent}% Off`;

    // discountPercent----------------------------------------------------------------

    // colorSelector-----------------------------------------------------------

    const colorSelector = document.getElementById("colorSelector");
    productDetails.options.forEach((option) => {
      if (option.name === "Color") {
        option.values.forEach((color) => {
          const colorName = Object.keys(color)[0];
          // console.log(colorName);
          const colorCode = color[colorName];
          // console.log(colorCode);
          const optionElement = document.createElement("button");
          optionElement.name = colorName;
          optionElement.style.backgroundColor = colorCode;

          // optionElement.addEventListener("click", (event) => {
          //   const selectedColor = event.target.name;
          //   console.log("Selected color:", selectedColor);
          // });

          colorSelector.appendChild(optionElement);
        });
      }
    });

    // colorSelector-----------------------------------------------------------

    // sizeSelector---------------------------------------------------------

    const sizeSelector = document.getElementById("sizeSelector");
    productDetails.options.forEach((option) => {
      if (option.name === "Size") {
        option.values.forEach((value) => {
          const newButton = document.createElement("input");
          newButton.type = "radio";
          newButton.name = "size"; // Set the same name for all radio buttons to make them mutually exclusive
          newButton.value = value; // Set the value of the radio button

          const label = document.createElement("label");
          label.textContent = value;

          // newButton.addEventListener("click", (event) => {
          //   const selectedSize = event.target.value;
          //   console.log("Selected Size:", selectedSize);
          // });
          sizeSelector.appendChild(newButton);
          sizeSelector.appendChild(label);
        });
      }
    });

    // sizeSelector---------------------------------------------------------

    // add to cart message ------------------------------------------

    colorSelector.addEventListener("click", function (event) {
      const selectedColor = event.target.name;
      console.log("Selected color:", selectedColor);

      sizeSelector.addEventListener("change", function (event) {
        const selectedSize = event.target.value;
        console.log("Selected size:", selectedSize);

        // Event listener for Add to Cart button
        const title = productDetails.title;
        const addToCartButton = document.getElementById("AddToCart");
        addToCartButton.addEventListener("click", function () {
          // Retrieve selected color and size from the scope of their respective event listeners
          const selectedColorButton = selectedColor;
          const selectedSizeButton = selectedSize;
          // console.log(selectedColorButton);
          // console.log(selectedSizeButton);
          displayAddToCartMessage(
            selectedColorButton,
            selectedSizeButton,
            title
          );
        });
      });
    });

    // add to cart message ------------------------------------------
  })
  .catch((error) => console.log(error));

// image--------------------------------------------------------------------------

//shopify image URL's were not working in my system , Hence I created image.json which contain URLs of images

fetch("image.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const thumbnailContainer = document.getElementById("thumbnailContainer");
    const mainImg = document.getElementById("mainImg");

    data.images.forEach((imgURL) => {
      const imgElement = document.createElement("img");
      imgElement.src = imgURL.src;
      imgElement.alt = "Image";
      imgElement.classList.add("thumbnailImage");
      // Add click event listener to thumbnail image
      imgElement.addEventListener("click", () => {
        // Set the clicked thumbnail image as the source of the main image
        mainImg.src = imgURL.src;
      });

      thumbnailContainer.appendChild(imgElement);
    });

    if (data.images.length > 0) {
      mainImg.src = data.images[0].src;
    }
  })
  .catch((error) => console.error("Error fetching images:", error));

// image--------------------------------------------------------------------------

// quantity---------------------------------------------------------------------

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const num = document.querySelector(".num");
let a = 0;

plus.addEventListener("click", () => {
  a++;
  num.innerText = a;
});
minus.addEventListener("click", () => {
  if (a >= 1) {
    a--;
    num.innerText = a;
  }
});

// quantity---------------------------------------------------------------------

// Function to display the Add to Cart message--------------------------------------------

function displayAddToCartMessage(selectedColor, selectedSize, title) {
  const addToCartMessage = document.getElementById("addToCartMessage");
  addToCartMessage.textContent = `${title} with Color ${selectedColor} and Size ${selectedSize} added to Cart`;
  addToCartMessage.style = "display:block; background-color: #c7fe74;  ";
  addToCartMessage.classList.add = "addToCartMessage";
  setTimeout(() => {
    addToCartMessage.style.display = "none";
  }, 5000);
}

// Function to display the Add to Cart message--------------------------------------------
