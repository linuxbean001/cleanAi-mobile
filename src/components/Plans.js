import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import PlansCard from './PlansCard';
import Header from './Header';
import Footer from './Footer';
import config from './../config/config';
import axios from 'axios';

const Plans = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const endpoint = `/admin/api/${config.apiVersion}/products.json`;
    axios
      .get(`${config.shopifyStoreUrl}${endpoint}`, {
        headers: {
          'X-Shopify-Access-Token': config.shopifyApiKey,
        },
      })
      .then(async (response) => {
        if (response.data.products) {
          const products = response.data.products;
          const planProduct = products.filter((product) => ['basic', 'premium', 'platinum'].includes(product.handle));
          setProductData(planProduct);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <ScrollView>
        <Header />
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" style={styles.loader} />
        ) : (
          productData.map((card, index) => (
            <PlansCard
              key={index}
              title={card.title}
              description={`You will get ${Number(card.variants[0].price).toFixed(0)} Credits`}
              price={Number(card.variants[0].price).toFixed(0)}
              card={card}
            />
          ))
        )}
        <Footer />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

export default Plans;
