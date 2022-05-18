import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/layout';
import Spinner from '../components/ui-kit/spinner';
import { ProductService } from '../components/core/api-services/product.service';
import { Product } from '../components/core/types/products';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const handleOption = (event) => {
    setQuality(event.target.value);
  }

  useEffect(() => {
    getProducts();
  }, [quality]);

  const getProducts = async () => {
    setLoading(true);
    ProductService.getProducts(quality).then((res: string) => {
      setProducts(JSON.parse(res));
    }).catch((e) => {
      console.log('getProducts Error = ', e);
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <>
      <Head>
        <title>Products List</title>
        <meta name="description" content="Scrape the products list from the django backend framework"/>
      </Head>
      <Layout>
        <div className="min-h-300 container mx-auto">
          <section className="flex justify-between items-center w-full mb-30">
            <div>
              <label className="mr-5">Quality:</label>
              <select onChange={handleOption}>
                <option value="">Any</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="special">Special</option>
              </select>
            </div>
            <button onClick={getProducts} className="btn-warning btn-sm">Search</button>
          </section>
          <section className="mb-50">
            <table className="table-auto border-separate border border-primary-75 w-full">
              <thead>
                <tr>
                  <th className="border border-primary-75">Name</th>
                  <th className="border border-primary-75">Quality</th>
                  <th className="border border-primary-75">Worth</th>
                  <th className="border border-primary-75">MaterialName</th>
                </tr>
              </thead>
              <tbody>
              {products.map((product, index) => <tr key={index}>
                <td className="border border-primary-50 text-center">{product.product_name}</td>
                <td className="border border-primary-50 text-center">{product.quality}</td>
                <td className="border border-primary-50 text-center">{product.worth}</td>
                <td className="border border-primary-50 text-center">{product.material_name}</td>
              </tr>)}
              </tbody>
            </table>
          </section>
        </div>
        <Spinner isLoading={loading} />
      </Layout>
    </>
  )
}

export default Home
