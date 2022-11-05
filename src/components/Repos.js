import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
	const { repos } = React.useContext(GithubContext);

	let languages = repos.reduce((total, item) => {
		const { language, stargazers_count } = item;
		if (!language) return total;
		if (!total[language]) {
			total[language] = {
				label: language,
				value: 1,
				stars: stargazers_count,
			};
		} else {
			total[language] = {
				...total[language],
				value: total[language].value + 1,
				stars: total[language].stars + stargazers_count,
			};
		}
		return total;
	}, {});
	// console.log(languages);

	// Most Used Languages
	const mostUsed = Object.values(languages)
		.sort((a, b) => {
			return b.value - a.value;
		})
		.slice(0, 5);

	// Most Popular Languages
	const mostPopular = Object.values(languages)
		.sort((a, b) => {
			return b.stars - a.stars;
		})
		.map((item) => {
			return { ...item, value: item.stars };
		})
		.slice(0, 5);
	// console.log(mostPopular);

	const chartData = [
		{
			label: "HTML",
			value: "13",
		},
		{
			label: "CSS",
			value: "230",
		},
		{
			label: "Javascript",
			value: "80",
		},
	];

	return (
		<section className="section">
			<Wrapper className="section-center">
				<Pie3D data={mostUsed} />
				<Column3D data={chartData} />
				{/* <Doughnut2D data={mostPopular} /> */}
				<Doughnut2D data={chartData} />
				<Bar3D data={chartData} />
				{/* <ExampleChart data={chartData} /> */}
				<div></div>
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

export default Repos;
