export type Asset = {
  id: string;
  name: string;
  parentId?: string;
  sensorId?: string;
  sensorType?: string;
  status: string;
  gatewayId: string;
  locationId: string;
};
