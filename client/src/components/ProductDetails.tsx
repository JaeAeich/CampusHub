import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addProduct } from '@/api/stores/stores';
import Product from '@/api/products/types';
import Service from '@/api/services/types';
import { getServices } from '@/api/services/services';
import handleFile from '@/utils/fileUpload';
import { services } from '../../app/constants';
import { Button } from './ui/button';

function ProductDetails() {
  const { store_id } = useParams() || '';
  const [service, setServices] = useState<Service[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<Product>({
    product_id: '', //
    offer_id: '', //
    product_categories: [],
    product_cost: 0, //
    product_description: '', //
    product_images: [], //
    product_name: '', //
    product_specifications: {},
    service_id: '', //
    stock: 0, //
    store_id: store_id as string, //
    rating: 0, //
  });
  async function handleSubmit(): Promise<void> {
    const response = await addProduct(store_id, productDetails);
    if ('id' in response) {
      toast({
        title: 'Product added',
        description: `The product id is ${response.id}`,
      });
      navigate(`/stores/${store_id}/products`);
    } else if ('message' in response) {
      toast({
        variant: 'destructive',
        title: 'Error while adding product',
        description: response.message,
      });
    }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageUrl: string | undefined = await handleFile(event);
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      product_images: [imageUrl],
    }));
  };

  const handleChange = (field: string, value: number | string | string[]) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  const addSpecificationPair = () => {
    const container = document.getElementById('productSpecifications');
    if (!container) return;

    const div = document.createElement('div');
    div.classList.add('flex', 'mb-2');

    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.className =
      'bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-1/2 p-2.5 mr-2';
    keyInput.placeholder = 'Key';
    keyInput.required = true;

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.className =
      'bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-1/2 p-2.5';
    valueInput.placeholder = 'Value';
    valueInput.required = true;

    div.appendChild(keyInput);
    div.appendChild(valueInput);

    container.appendChild(div);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getServices();
      if ('error' in response) {
        setServices(services);
      } else if ('services' in response) {
        setServices(response.services as Service[]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-2 md:p-4 flex justify-center w-screen">
      <div className="w-full px-6 pb-2 mt-2 sm:max-w-3xl sm:rounded-lg">
        <h2 className="mx-auto md:text-xl font-subheading font-bold text-lgg text-center">
          Enter Product Details
        </h2>
        <div className="items-center mt-2 text-primary">
          <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-base font-medium text-primary dark:text-background"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-background border darkgray text-primary text-baserounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="Product Name"
                required
                onChange={(e) => handleChange('product_name', String(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="product_description"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Description
            </label>
            <textarea
              id="description"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 h-40"
              placeholder="description"
              required
              onChange={(e) => handleChange('product_description', String(e.target.value))}
            />
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="product_specifications"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Product Specifications
            </label>
            <div id="productSpecifications">
              <div className="flex mb-2">
                <input
                  type="text"
                  className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-1/2 p-2.5 mr-2"
                  placeholder="Key"
                  required
                />
                <input
                  type="text"
                  className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-1/2 p-2.5"
                  placeholder="Value"
                  required
                />
              </div>
            </div>
            <Button
              className="ml-2 bg-accent hover:bg-accentDark rounded-full w-16 h-16 p-1"
              onClick={addSpecificationPair}
            >
              <Plus />
            </Button>
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="product_categories"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Product Categories
            </label>
            <input
              id="product_categories"
              type="text"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="product categories"
              required
              onChange={(e) =>
                handleChange('product_categories', [String(e.target.value.split(','))])
              }
            />
          </div>
          <div className="mb-2 sm:mb-6 w-full">
            <label
              htmlFor="service"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Service
            </label>
            <Select required onValueChange={(e) => handleChange('service_id', e)}>
              <SelectTrigger className="w-full text-smm">
                <SelectValue placeholder="service" />
              </SelectTrigger>
              <SelectContent className="text-base">
                <SelectGroup>
                  {service.map((ser) => (
                    <SelectItem className="text-smm" key={ser.service_id} value={ser.service_id}>
                      {ser.service_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="product_cost"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Cost
            </label>
            <input
              id="cost"
              type="number"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="0"
              required
              onChange={(e) => handleChange('product_cost', Number(e.target.value))}
            />
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="stock"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              placeholder="0"
              required
              onChange={(e) => handleChange('stock', Number(e.target.value))}
            />
          </div>

          <div className="mb-2 sm:mb-6 w-full">
            <label
              htmlFor="productImage"
              className="block mb-2 text-base font-medium text-primary dark:text-background"
            >
              Product Image
            </label>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              required
              className="bg-background border darkgray text-primary text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          <div className="flex justify-end my-5">
            <button
              type="submit"
              className="text-background bg-accent font-bold hover:bg-accentDark focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-accent dark:focus:ring-accentDark"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
