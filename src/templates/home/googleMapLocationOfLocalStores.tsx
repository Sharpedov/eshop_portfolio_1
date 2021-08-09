import React from "react";
import styled from "styled-components";
import {
	GoogleMap,
	InfoWindow,
	Marker,
	useLoadScript,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import SpinnerLoading from "src/components/loadingIndicators/spinnerLoading";

interface pageProps {}

const mapContainerStyle = {
	width: "100%",
	height: "100%",
};
const center = {
	lat: 51,
	lng: 17.1,
};
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
};
const localStores = [
	{
		lat: 51.107883,
		lng: 17.038538,
	},
];

const GoogleMapLocationOfLocalStores = ({}: pageProps) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	return (
		<Container>
			<Header>
				<h6>Local stores locations</h6>
				<StoresList></StoresList>
			</Header>
			<Map>
				{!isLoaded ? (
					<SpinnerLoading size={50} />
				) : loadError ? (
					<div>Error loading maps</div>
				) : (
					<GoogleMap
						mapContainerStyle={mapContainerStyle}
						zoom={9}
						center={center}
						options={options}
					>
						{localStores.map((marker) => (
							<Marker
								key={`${marker.lat}-${marker.lng}`}
								position={{ lat: marker.lat, lng: marker.lng }}
							/>
						))}
					</GoogleMap>
				)}
			</Map>
		</Container>
	);
};

export default GoogleMapLocationOfLocalStores;

const Container = styled.div`
	background-color: ${({ theme }) => theme.surface.primary};
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1720px;
	padding: 20px 16px;

	> h6 {
		font-size: 20px;
	}

	@media (min-width: 480px) {
		padding: 20px 31px;
	}
	@media (min-width: 768px) {
		> h6 {
			font-size: 24px;
		}
	}
`;

const StoresList = styled.ul``;

const Store = styled.li`
	list-style: none;
`;

const Map = styled.div`
	display: grid;
	place-items: center;
	min-height: 300px;
	max-height: 450px;
	height: 50vw;
`;
