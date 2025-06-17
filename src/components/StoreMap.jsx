import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useContext, useMemo, useState } from 'react';
import { Card, Statistic, Row, Col, Empty , Typography } from 'antd';
import L from 'leaflet';
import ProductSearch from './ProductSearch';
import StoreDetailsModal from './StoreDetailsModal';
import { DataContext } from '../context/DataContext';
import { getFilteredStores } from '../helpers/getFilteredStores';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const StoreMap = () => {
  const { stores, products, selectedProduct } = useContext(DataContext);
  const [selectedStore, setSelectedStore] = useState(null);

  const { filteredStores, minPrice, maxPrice } = useMemo(() => {
    return getFilteredStores(selectedProduct, stores, products);
  }, [selectedProduct, stores, products]);

  const center = useMemo(() => {
    if (filteredStores.length === 0) return [45.5, 9.5];
    const avgLat = filteredStores.reduce((sum, store) => sum + parseFloat(store.latitude), 0) / filteredStores.length;
    const avgLon = filteredStores.reduce((sum, store) => sum + parseFloat(store.longitude), 0) / filteredStores.length;
    return [avgLat, avgLon];
  }, [filteredStores]);

  if (filteredStores.length === 0 && selectedProduct) {
    return (
      <Empty description={`No stores found selling "${selectedProduct}"`} />
    );
  }

  return (
    <div>
      <ProductSearch />
      {selectedProduct && minPrice !== null && maxPrice !== null && (
        <Card style={{ marginBottom: '16px', width: '100%', maxWidth: '400px', padding: 0 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Min Price" value={minPrice} prefix="€" precision={2} />
            </Col>
            <Col span={12}>
              <Statistic title="Max Price" value={maxPrice} prefix="€" precision={2} />
            </Col>
          </Row>
        </Card>
      )}
      <div style={{ height: '600px' }}>
        <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredStores.map((store) => (
            <Marker
              key={store.store_id}
              position={[parseFloat(store.latitude), parseFloat(store.longitude)]}
              icon={selectedProduct ? store.icon : new L.Icon.Default()}
              eventHandlers={{
                click: () => setSelectedStore(store),
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Popup>
                <div>
                  <strong>{store.address.street}</strong><br />
                  {store.address.city}, {store.address.province}<br />
                  Insegna: {store.insegna}<br />
                  Gruppo: {store.gruppo}<br />
                  {selectedProduct && (
                    <>
                      Base Price: €{(parseInt(store.base_price) / 100).toFixed(2)}<br />
                      {store.promo_price && (
                        <Typography.Text strong type="danger">
                          Promo Price: €{(parseInt(store.promo_price) / 100).toFixed(2)}
                        </Typography.Text>
                      )}
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedStore && (
        <StoreDetailsModal
          store={selectedStore}
          products={products.filter((p) => p.store_id === String(selectedStore.store_id))}
          onClose={() => setSelectedStore(null)}
        />
      )}
    </div>
  );
};

export default StoreMap;