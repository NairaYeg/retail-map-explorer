import React, { useContext, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Modal } from 'antd';
import { DataContext } from '../context/DataContext';
import 'leaflet/dist/leaflet.css';
import {  getFilteredStores } from '../helpers'; 

const StoreMap = () => {
  const { stores, products, selectedProduct } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

 const filteredStores = useMemo(
    () => getFilteredStores(selectedProduct, stores, products),
    [selectedProduct, stores, products]
  );

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    setModalVisible(true);
  };

  return (
    <div style={{ height: '500px', marginBottom: '24px' }}>
      <MapContainer
        center={[41.9028, 12.4964]} // Center on Italy
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* 2. Map over the dynamically filtered stores */}
        {filteredStores.map((store) => (
          <Marker
            key={store.store_id}
            position={[parseFloat(store.latitude), parseFloat(store.longitude)]}
            icon={store.icon} // Use the dynamic icon
            eventHandlers={{ click: () => handleMarkerClick(store) }}
          >
            <Tooltip>
              {/* 3. Update the tooltip content */}
              <div>
                <p><b>Insegna:</b> {store.insegna}</p>
                <p><b>City:</b> {store.address.city}</p>
                {selectedProduct && (
                  <>
                    <hr />
                    <p><b>Price:</b> €{(store.base_price / 100).toFixed(2)}</p>
                    {store.promo_price && (
                      <p style={{ color: 'red' }}><b>Promo:</b> €{(store.promo_price / 100).toFixed(2)}</p>
                    )}
                  </>
                )}
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