export function formatDates(time: string) {
	const minute = new Date(time).getMinutes();
	const hour: number = new Date(time).getHours() + 1;
	let day: string | number = new Date(time).getDay();
	switch (day) {
		case 1:
			day = "mon";
			break;
		case 2:
			day = "tue";
			break;
		case 3:
			day = "wed";
			break;
		case 4:
			day = "thu";
			break;
		case 5:
			day = "fri";
			break;
		case 6:
			day = "sat";
			break;
		case 0:
			day = "sun";
			break;
		default:
			day = "invalid day";
	}
	const dayOfMonth = new Date(time).getDate();
	let month: string | number = new Date(time).getMonth();
	switch (month) {
		case 0:
			month = "January";
			break;
		case 1:
			month = "February";
			break;
		case 2:
			month = "March";
			break;
		case 3:
			month = "April";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "June";
			break;
		case 6:
			month = "July";
			break;
		case 7:
			month = "August";
			break;
		case 8:
			month = "September";
			break;
		case 9:
			month = "October";
			break;
		case 10:
			month = "November";
			break;
		case 11:
			month = "December";
			break;
		default:
			month = "Invalid month";
	}

	const year = new Date(time).getFullYear();

	return `${dayOfMonth}/${month}/${year}  ${hour % 12}:${minute} ${
		hour > 12 ? "PM" : "AM"
	}`;
}
