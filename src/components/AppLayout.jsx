import { Layout, Menu } from "antd";
import {
  NAVIGATION_ITEMS,
  SIDER_WIDTH,
} from "../constants/navigation";
import { TITLES } from "../constants/messages";
import "../App.css";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children, currentView, setCurrentView }) =>  (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="app-header">
        <h1 className="app-title">{TITLES.DASHBOARD}</h1>
      </Header>
      <Layout>
        <Sider width={SIDER_WIDTH} className="app-sider" theme="light">
          <Menu
            mode="vertical"
            selectedKeys={[currentView]}
            onClick={({ key }) => setCurrentView(key)}
          >
            {NAVIGATION_ITEMS.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content className="app-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );

export default AppLayout;