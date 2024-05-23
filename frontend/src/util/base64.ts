export const convertToBase64: (file: File) => Promise<string> = (
	file: File
) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => resolve(fileReader.result as string);
		fileReader.onerror = (err) => reject(err);
	});
};
