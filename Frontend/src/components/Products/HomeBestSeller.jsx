import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarProducts } from "../../redux/slices/productSlice";
import ProductDetailsView from "./ProductDetailsView";

const HomeBestSeller = ({ product }) => {
  const dispatch = useDispatch();
  const { similarProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (product?._id) {
      dispatch(fetchSimilarProducts(product._id));
    }
  }, [dispatch, product]);

  return (
    <ProductDetailsView
      product={product}
      similarProducts={similarProducts}
    />
  );
};

export default HomeBestSeller;
