import { useEffect, useState } from "react";

interface Product {
	id: number;
	name: string;
	price: string;
	image: string;
}

interface Props {
	url: string;
}

interface FetchResult {
	products: Product[] | null;
	isLoading: boolean;
	error: string | null;
}

const useFetch = (props: Props): FetchResult => {
	const { url } = props;
	const [products, setProducts] = useState<Product[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const abortController = new AbortController();
		const fetchProducts = async () => {
			try {
				const response = await fetch(url, { signal: abortController.signal });
				if (!response.ok) {
					throw new Error("Network Error!");
				}
				const data: Product[] = await response.json();
				setProducts(data);
				setIsLoading(false);
			} catch (error) {
				if (!abortController.signal.aborted) {
					setError((error as Error).message);
					setIsLoading(false);
				}
			}
		};
		fetchProducts();
		return () => {
			abortController.abort();
		};
	}, [url]);
	return { products, isLoading, error };
};

export default useFetch;
