export const disCount: (price: number, dc: number) => string = (
	price: number,
	dc: number = 0
) => {
	return (price - (price * dc) / 100).toFixed(2);
};
