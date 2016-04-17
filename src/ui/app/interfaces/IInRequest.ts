export interface IInRequest {
  id: string;
  timestamp: Date|string;
  method: string;
  hostname: string;
  port: number;
  url: string;
  statusCode?: number;
  latency?: number;
}
