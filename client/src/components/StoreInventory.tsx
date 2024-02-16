import { getProductsByStoreId, addProduct } from "@/api/stores/stores";
import * as XLSX from 'xlsx';
import { useToast } from '@/components/ui/use-toast';
import Product from "@/api/products/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import ProductCard from "./ProductCard";

function StoreInventory() {
  const { store_id } = useParams() || '';
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [errorProducts, setErrorProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productsDone, setProductsDone] = useState(false);
  const { toast } = useToast();
  const [productDetails, setProductDetails] = useState<Product>({
    product_id: '',
    product_categories: [],
    product_name: '',
    store_id: store_id || '',
    service_id: '',
    product_images: [],
    product_cost: 0,
    product_description: '',
    stock: 0,
    product_specifications: {},
    offer_id: '',
    rating: 0
  });

  const handleChange = (field: string, value: string |number |object| string[]) => {
    const details: Product = productDetails;
    // @ts-expect-error: user_address field was not getting set :|
    details[`${field}`] = value;
    setProductDetails(details);
  };

  async function handleSubmit(): Promise<void> {

    const response = await addProduct(store_id, productDetails);
    if ('id' in response) {
      toast({
        title: 'Product added successfully',
        description: `Your product id is ${response.id}`,
      });
      // navigate(`/`);
    } else if ('message' in response) {
      toast({
        variant: 'destructive',
        title: 'Error while adding product',
        description: response.message,
      });
    }
  }
  useEffect(() => {
    async function fetchStoreProducts() {
        if (store_id !== undefined) {
          const response = await getProductsByStoreId(store_id);
          if ('error' in response) {
            setErrorProducts(true);
            setIsLoading(false);
          } else if ('products' in response) {
            setStoreProducts(response.products);
            setIsLoading(false);
          }
        }
      }
    fetchStoreProducts();
  }, [store_id]);

const handleSheetChange = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      setProductsDone(false);
      return;
    }
  
    const file = files[0];
    const reader = new FileReader();
  
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
  
          const expectedHeaders = [
            'product_categories',
            'product_name',
            'product_images',
            'product_cost',
            'product_description',
            'stock',
            'product_specifications',
          ];
          const expectedDataTypes = [
            'string',
            'string',
            'string',
            'number',
            'string',
            'number',
            'object',
          ];
  
          const sheetFirstRow = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Assuming sheetFirstRow is an array with the first row as headers
          const sheetHeaders = sheetFirstRow[0];

          if (!expectedHeaders.every((header) => sheetHeaders.includes(header))) {
            setProductsDone(false);
            return;
          }

          const first7Values = sheetHeaders.slice(0, 7);
          console.log(first7Values);
  
          // Validate data types
          const sheetData = XLSX.utils.sheet_to_json(sheet, { header: expectedHeaders });

          const isValidData = sheetData.slice(1).every((row) =>
            expectedHeaders.every((header, index) => {
              const actualValue = row[header];
              const actualType = typeof row[header];
              if (expectedDataTypes[index] === 'object') {
                handleChange(header,JSON.parse(actualValue))
                return typeof JSON.parse(row[header]) === 'object' && row[header] !== null;
              }
              if (expectedDataTypes[index] === 'number') {
                const isValidNumber = Number(actualValue);
                handleChange(header,isValidNumber)
                return (typeof isValidNumber) === expectedDataTypes[index]
              }
              if(header==='product_categories' || header==='product_images'){
                const a=[actualValue]
                handleChange(header,a)
                return actualType === expectedDataTypes[index];
              }
              handleChange(header,actualValue)
              return actualType === expectedDataTypes[index];
                  })
);

        if (!isValidData) {
          setProductsDone(false);
          toast({
            variant: 'destructive',
            title: 'Please check the header and values format and try again.',
          });
        }else{
          setProductsDone(true);
          console.log(productDetails)
          handleSubmit();
        }
        }
      } catch (error) {
        setProductsDone(false);
      }
    };
  
    reader.readAsBinaryString(file);
    
  };

  if (isLoading) {
    return (
      <div className="h-auto my-auto mx-auto justify-center items-center">
        <img src="/loading.gif" alt="" className="opacity-70" />
      </div>
    );
  }
  if (storeProducts.length === 0 || errorProducts) {
    return (
      <div className="flex flex-col items-center mx-auto justify-center m-10 mb-20">
      <img src="/noresult.gif" alt="noResults" className="h-24 sm:h-32 w-96 md:h-108 lg:w-128" />
      <h2 className="align-center text-darkgray text-smm md:text-lg">
        No Products yet? Add your .xslx file 
        <Button className="ml-2 bg-accent hover:bg-accentDark rounded-full w-16 h-16 p-1">
      <input type="file" className="opacity-0 cursor-pointer" onChange={(e) => handleSheetChange(e.target.files)}/>
      </Button>
      </h2>
      {errorProducts&&<h2 className="text-secondary text-smm md:text-lg">Please follow the specified format! </h2>}
    </div>
    );
  }
  return (
    <div className=" w-full p-3 my-auto justify-center lg:justify-start">
    <div className="flex h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {storeProducts.map((prod: Product) => (
            <ProductCard product={prod} wishlisted={false} />
          ))}
        </div>
      </div>
      <div className="mx-auto justify-center text-center">
      <Button className=" ml-2 bg-accent hover:bg-accentDark rounded-full w-16 h-16 p-1">
      <input type="file" className="opacity-0 cursor-pointer" onChange={(e) => handleSheetChange(e.target.files)}/>
      </Button>
      </div>
      </div>
    )
};

export default StoreInventory;