import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { analyzeNutrition, calculateScore } from "../utils";
import Score from "./Score";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fields: [
      "product_name",
      "product_name_en",
      "image_url",
      "nutriments",
      "nutriscore_grade",
      "additives_n",
      "nutriscore",
      "nutriscore_2023_tags",
      "ecoscore_score",
      "brands",
    ],
  }),
};

const Product = () => {
  const { barcode } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/${barcode}`,
        options
      );
      const data = await response.json();

      console.log(data);

      if (data.success) {
        setProduct(data.data);
      } else {
        setError(data.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [barcode]);

  const score = useMemo(() => {
    if (!product) {
      return 0;
    }

    return calculateScore(
      product.nutriscore_grade,
      product.additives_n,
      product.ecoscore_score
    );
  }, [product]);

  const nutriments = useMemo(() => {
    if (!product || !product.nutriments || product.additives_n == undefined)
      return [];
    return analyzeNutrition(product.nutriments, product.additives_n);
  }, [product]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div class="animate-spin rounded-full border-8 border-t-8 border-gray-700 border-t-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (product) {
    return (
      <div className="mb-10">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
          <div>
            <img
              src={product.image_url}
              className="w-28 h-28 rounded-md object-contain object-center"
            />
          </div>
          <div>
            <div className="mb-2">
              <p className="text-xl font-semibold">{product.product_name_en}</p>
              <p className="text-md text-gray-500">{product.brands}</p>
            </div>
            <Score score={score} />
          </div>
        </div>

        <div className="flex flex-col gap-4 my-5">
          {nutriments.map((nutriment) => {
            const Icon = nutriment.Icon;
            return (
              <div
                key={nutriment.name}
                className="flex shadow-sm p-4 rounded-md gap-6 items-center"
              >
                <div className="p-2">
                  <Icon fontSize={"large"} className="scale-125" />
                </div>

                <div className="flex w-full justify-between items-center">
                  <div>
                    <p className="font-semibold text-xl">{nutriment.name}</p>
                    <p className="text-sm text-gray-400">
                      {nutriment.feedback}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <p className="text-md text-gray-500">
                      {nutriment.quantity}
                    </p>
                    <p
                      className={"w-4 h-4 rounded-full " + nutriment.color}
                    ></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Product;
