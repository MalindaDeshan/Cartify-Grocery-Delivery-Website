import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const DetailsProduct = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const product = products.find((item) => item._id === id);

  const [relatedProduct, setRelatedProduct] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  // Set related products
  useEffect(() => {
    if (products.length > 0 && product) {
      const productsCopy = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelatedProduct(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  // Set initial thumbnail
  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) return <p className="mt-12 text-center">Product not found.</p>;

  return (
    <div className="mt-12">
      {/* Breadcrumb */}
      <p>
        <Link to="/">Home</Link> /
        <Link to="/products"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        / <span className="text-indigo-500">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image?.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency}
              {product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description?.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            )) || <li>No description available.</li>}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related products (optional) */}
      {relatedProduct.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-medium mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProduct.map((p) => (
              <div
                key={p._id}
                onClick={() => {
                  navigate(`/products/${p.category.toLowerCase()}/${p._id}`);
                  scrollTo(0, 0);
                }}
                className="border p-2 rounded cursor-pointer"
              >
                <img
                  src={p.image?.[0]}
                  alt={p.name}
                  className="w-full h-32 object-cover mb-2"
                />
                <p className="text-sm font-medium">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsProduct;
