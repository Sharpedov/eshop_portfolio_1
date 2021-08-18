import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
	GoogleMap,
	InfoWindow,
	Marker,
	useLoadScript,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import SpinnerLoading from "src/components/loadingIndicators/spinnerLoading";
import { CardActionArea } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

interface pageProps {}

const mapContainerStyle = {
	width: "100%",
	height: "100%",
};
const mapCenter = {
	lat: 51.107883,
	lng: 17.038538,
};
const mapOptions = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};
const localStores = [
	{
		id: 1,
		city: "Wrocław",
		street: "Lorem ipsum...",
		postalcode: "52-340",
		lat: 51.107883,
		lng: 17.038538,
	},
	{
		id: 2,
		city: "Kraków",
		street: "Lorem ipsum...",
		postalcode: "30-063",
		lat: 50.049683,
		lng: 19.944544,
	},
	{
		id: 3,
		city: "Warszawa",
		street: "Lorem ipsum...",
		postalcode: "01-376",
		lat: 52.237049,
		lng: 21.017532,
	},
];

const GoogleMapLocationOfLocalStores = ({}: pageProps) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});
	const mapRef = useRef(null);
	const [selectedStore, setSelectedStore] = useState(null);
	const [selectedMarker, setSelectedMarker] = useState(null);
	const onMapLoad = useCallback((map) => (mapRef.current = map), []);

	const onStoreClick = useCallback((store) => {
		setSelectedStore((prev) => (prev?.id === store.id ? null : store));
	}, []);

	const panTo = useCallback(({ lat, lng, zoom }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(zoom);
	}, []);

	useEffect(() => {
		if (selectedStore)
			panTo({ lat: selectedStore.lat, lng: selectedStore.lng, zoom: 11 });

		return () => panTo({ lat: mapCenter.lat, lng: mapCenter.lng, zoom: 9 });
	}, [selectedStore, panTo]);

	return (
		<Container id="googleMapLocalStores">
			<Header>
				<h6>Local stores locations</h6>
				<StoresList>
					{localStores.map((store) => (
						<Store
							key={`${store.city}-${store.lat}-${store.lng}`}
							component="li"
							onClick={() => onStoreClick(store)}
						>
							<StoreLeftSide
								active={selectedStore && selectedStore.id === store.id}
							>
								<LocationOnIcon className="storeLocation__icon" />
							</StoreLeftSide>
							<StoreRightSide>
								<span>{store.city}</span>
								<span>{store.street}</span>
								<span>{store.postalcode}</span>
							</StoreRightSide>
						</Store>
					))}
				</StoresList>
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
						center={mapCenter}
						options={mapOptions}
						onLoad={onMapLoad}
					>
						{localStores.map((marker) => (
							<Marker
								animation={2}
								key={`${marker.lat}-${marker.lng}`}
								position={{ lat: marker.lat, lng: marker.lng }}
								onClick={() => setSelectedMarker(marker)}
							/>
						))}
						{selectedMarker && (
							<InfoWindow
								position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
								onCloseClick={() => setSelectedMarker(null)}
							>
								<MarkerInfoWindow>
									<span>{selectedMarker.city}</span>
									<span>{selectedMarker.street}</span>
									<span>{selectedMarker.postalcode}</span>
								</MarkerInfoWindow>
							</InfoWindow>
						)}
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
	padding: 50px 16px 25px;

	> h6 {
		font-size: 20px;
	}

	@media (min-width: 480px) {
		padding: 60px 31px 30px;
	}
	@media (min-width: 768px) {
		> h6 {
			font-size: 24px;
		}
	}
`;

const StoresList = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, 130px);
	justify-content: center;
	grid-gap: 15px;
	margin-top: 15px;

	@media (min-width: 360px) {
		grid-template-columns: repeat(auto-fill, 145px);
		grid-gap: 20px;
		margin-top: 25px;
	}
	@media (min-width: 480px) {
		grid-template-columns: repeat(auto-fill, 150px);
	}
`;

const Store = styled(CardActionArea)`
	display: flex;
	align-items: flex-start;
	flex-basis: 100%;
	list-style: none;
	padding: 5px;
	color: ${({ theme }) => theme.color.white};

	@media (min-width: 360px) {
		padding: 7px;
	}
`;

const StoreLeftSide = styled.div`
	display: flex;
	margin-right: 10px;

	.storeLocation__icon {
		font-size: 24px;
		opacity: ${({ active }) => (active ? "1" : "0.4")};
		color: ${({ active, theme }) => (active ? theme.color.primary : "inherit")};
		transition: opacity 0.2s ease, color 0.2s ease;
	}

	@media (min-width: 1440px) {
		.storeLocation__icon {
			font-size: 26px;
		}
	}
`;

const StoreRightSide = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7px 0;
	font-size: 13px;

	> span {
		opacity: 0.9;
	}
	@media (min-width: 360px) {
		font-size: 14px;
	}
	@media (min-width: 1440px) {
		font-size: 15px;
	}
`;

const Map = styled.div`
	display: grid;
	place-items: center;
	min-height: 360px;
	max-height: 480px;
	height: 50vw;
`;

const MarkerInfoWindow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7px 0;
	color: ${({ theme }) => theme.color.black};
	font-size: 14px;
`;
