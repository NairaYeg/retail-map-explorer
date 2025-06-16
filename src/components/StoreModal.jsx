import { Modal, Descriptions } from "antd";

const StoreModal = ({ store, products, onClose }) => (
  <Modal
    title={`Store: ${store.address.street}`}
    open={!!store}
    onCancel={onClose}
    footer={null}
  >
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Store ID">{store.store_id}</Descriptions.Item>
      <Descriptions.Item label="Street">
        {store.address.street}
      </Descriptions.Item>
      <Descriptions.Item label="City">{store.address.city}</Descriptions.Item>
      <Descriptions.Item label="Province">
        {store.address.province}
      </Descriptions.Item>
      <Descriptions.Item label="Postal Code">
        {store.address.postalCode}
      </Descriptions.Item>
      <Descriptions.Item label="Insegna">{store.insegna}</Descriptions.Item>
      <Descriptions.Item label="Gruppo">{store.gruppo}</Descriptions.Item>
      <Descriptions.Item label="Centrale">{store.centrale}</Descriptions.Item>
      <Descriptions.Item label="Orgcedi">{store.orgcedi}</Descriptions.Item>
      <Descriptions.Item label="Services">
        {store.services
          ? Object.keys(store.services)
              .filter((key) => store.services[key])
              .join(", ")
          : "None"}
      </Descriptions.Item>
      <Descriptions.Item label="Products">
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.name}>
                {product.name}: €
                {(parseInt(product.base_price) / 100).toFixed(2)}
                {product.promo_price &&
                  ` (Promo: €${(parseInt(product.promo_price) / 100).toFixed(
                    2
                  )})`}
              </li>
            ))}
          </ul>
        ) : (
          "No products available"
        )}
      </Descriptions.Item>
    </Descriptions>
  </Modal>
);

export default StoreModal;
