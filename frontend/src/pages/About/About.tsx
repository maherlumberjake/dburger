import img from "../../assets/burger.png";

import "./about.scss";

export default function About() {
	return (
		<section
			className="py-20 px-6  flex flex-col justify-around gap-5 items-start !h-full !w-full "
			style={{ backgroundImage: `url(${img})` }}
		>
			<h1 className=" text-5xl font-bold text-yellow-500 my-10">D burger</h1>
			<div>
				<p className=" text-2xl leading-relaxed">
					<span className=" text-yellow-500 font-semibold">D burger</span> it's
					an website that many burger resturant use's it to offer their burger,
					all in one place to make it accessable by all everywhere in eurpe we
				</p>
				<dd className="text-yellow-500 text-4xl font-bold mt-8 mb-4">
					We offer:
				</dd>
				<ul className=" list-disc pl-4 md:text-lg *:mb-4 ">
					<li>
						Free delevery service that can reach you any where in europe .
					</li>
					<li>Dozens of options for both vergeterian and non-vageterian .</li>
				</ul>
			</div>
		</section>
	);
}
