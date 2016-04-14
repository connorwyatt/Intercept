interface IRequest {
  id: String;
  timestamp: Date;
  method: String;
  hostname: String;
  port: Number;
  url: String;
  statusCode?: Number;
  latency?: Number;
}
