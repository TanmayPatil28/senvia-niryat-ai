import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    details: err.details || null
  })
}
