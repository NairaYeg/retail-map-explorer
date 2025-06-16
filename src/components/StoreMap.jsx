import React, { useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Modal } from 'antd';
import { DataContext } from '../context/DataContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const StoreMap = () => {
  const { stores } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const createIcon = () => {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff;"></div>`,
      iconSize: [20, 20],
    });
  };

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    setModalVisible(true);
  };

  return (
    <div style={{ height: '500px', marginBottom: '24px' }}>
      <MapContainer
        center={[45.5, 9.5]} // Center on Italy
        zoom={8}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stores.map((store) => (
          <Marker
            key={store.store_id}
            position={[parseFloat(store.latitude), parseFloat(store.longitude)]}
            icon={createIcon()}
            eventHandlers={{ click: () => handleMarkerClick(store) }}
          >
            <Tooltip>
              <div>
                <p><b>Street:</b> {store.address.street}</p>
                <p><b>City:</b> {store.address.city}</p>
                <p><b>Province:</b> {store.address.province}</p>
                <p><b>Insegna:</b> {store.insegna}</p>
                <p><b>Gruppo:</b> {store.gruppo}</p>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {selectedStore && (
        <Modal
          title="Store Details"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <p><b>Store ID:</b> {selectedStore.store_id}</p>
          <p><b>Street:</b> {selectedStore.address.street}</p>
          <p><b>City:</b> {selectedStore.address.city}</p>
          <p><b>Province:</b> {selectedStore.address.province}</p>
          <p><b>Postal Code:</b> {selectedStore.address.postalCode}</p>
          <p><b>Latitude:</b> {selectedStore.latitude}</p>
          <p><b>Longitude:</b> {selectedStore.longitude}</p>
          <p><b>Services:</b> {JSON.stringify(selectedStore.services)}</p>
          <p><b>Centrale:</b> {selectedStore.centrale}</p>
          <p><b>Gruppo:</b> {selectedStore.gruppo}</p>
          <p><b>Orgcedi:</b> {selectedStore.orgcedi}</p>
          <p><b>Insegna:</b> {selectedStore.insegna}</p>
        </Modal>
      )}
    </div>
  );
};

export default StoreMap;