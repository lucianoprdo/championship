export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'INVALID_DATA': return 400;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    case 'SUCCESS_NO_CONTENT': return 204;
    case 'CREATED': return 201;
    case 'UNAUTHORIZED': return 401;
    case 'UNABLE_TO_PROCESS': return 422;
    default: return 500;
  }
}
