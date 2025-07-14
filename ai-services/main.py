from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
import numpy as np
import pandas as pd
from typing import List, Dict, Any
import logging
import os
from datetime import datetime

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Senvia Niryat AI Services",
    description="AI-powered microservices for export-import management",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class DocumentAnalysisRequest(BaseModel):
    document_type: str
    content: str

class PredictionRequest(BaseModel):
    features: List[float]
    model_type: str

class RouteOptimizationRequest(BaseModel):
    origin: str
    destination: str
    cargo_type: str
    weight: float
    urgency: str

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "AI Services"
    }

# Document processing endpoint
@app.post("/api/ai/document/analyze")
async def analyze_document(request: DocumentAnalysisRequest):
    """
    Analyze trade documents using AI/ML models
    """
    try:
        # Simulate AI document processing
        analysis_result = {
            "document_type": request.document_type,
            "extracted_data": {
                "invoice_number": "INV-2024-001",
                "amount": 25000.0,
                "currency": "USD",
                "supplier": "ABC Trading Co.",
                "items": [
                    {"description": "Electronics", "quantity": 100, "unit_price": 250.0}
                ]
            },
            "compliance_check": {
                "status": "APPROVED",
                "confidence": 0.95,
                "issues": []
            },
            "ai_confidence": 0.92,
            "processing_time": "1.2s"
        }
        
        return JSONResponse(content=analysis_result)
    
    except Exception as e:
        logger.error(f"Document analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail="Document analysis failed")

# Predictive analytics endpoint
@app.post("/api/ai/predict/demand")
async def predict_demand(request: PredictionRequest):
    """
    Predict market demand using ML models
    """
    try:
        # Simulate demand prediction
        prediction_result = {
            "prediction": {
                "demand_forecast": 1250.5,
                "trend": "increasing",
                "confidence_interval": [1100.0, 1400.0],
                "time_horizon": "30_days"
            },
            "market_insights": {
                "peak_months": ["March", "April", "May"],
                "growth_rate": 0.15,
                "seasonal_factor": 1.2
            },
            "model_performance": {
                "accuracy": 0.87,
                "mae": 45.2,
                "model_type": request.model_type
            }
        }
        
        return JSONResponse(content=prediction_result)
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction failed")

# Route optimization endpoint
@app.post("/api/ai/route/optimize")
async def optimize_route(request: RouteOptimizationRequest):
    """
    Optimize shipping routes using AI algorithms
    """
    try:
        # Simulate route optimization
        optimization_result = {
            "optimal_route": {
                "path": [request.origin, "Transit Hub", request.destination],
                "total_distance": 8500.5,
                "estimated_time": "14 days",
                "cost": 3250.0,
                "carbon_footprint": 2.1
            },
            "alternatives": [
                {
                    "path": [request.origin, "Alternative Hub", request.destination],
                    "total_distance": 9200.0,
                    "estimated_time": "16 days",
                    "cost": 2980.0,
                    "carbon_footprint": 2.3
                }
            ],
            "recommendations": [
                "Consider air freight for urgent deliveries",
                "Sea freight recommended for cost optimization"
            ],
            "ai_score": 0.89
        }
        
        return JSONResponse(content=optimization_result)
    
    except Exception as e:
        logger.error(f"Route optimization error: {str(e)}")
        raise HTTPException(status_code=500, detail="Route optimization failed")

# Risk assessment endpoint
@app.post("/api/ai/risk/assess")
async def assess_risk(data: Dict[str, Any]):
    """
    Assess trade risks using AI models
    """
    try:
        risk_assessment = {
            "overall_risk": "MEDIUM",
            "risk_score": 0.35,
            "risk_factors": [
                {
                    "factor": "Political Stability",
                    "score": 0.2,
                    "impact": "LOW"
                },
                {
                    "factor": "Currency Fluctuation", 
                    "score": 0.6,
                    "impact": "MEDIUM"
                },
                {
                    "factor": "Supply Chain",
                    "score": 0.3,
                    "impact": "LOW"
                }
            ],
            "recommendations": [
                "Consider hedging currency exposure",
                "Monitor political developments",
                "Diversify supplier base"
            ],
            "confidence": 0.83
        }
        
        return JSONResponse(content=risk_assessment)
    
    except Exception as e:
        logger.error(f"Risk assessment error: {str(e)}")
        raise HTTPException(status_code=500, detail="Risk assessment failed")

# Image processing for quality control
@app.post("/api/ai/vision/quality-check")
async def quality_check(file: UploadFile = File(...)):
    """
    Analyze product images for quality assessment
    """
    try:
        # Simulate image processing
        quality_result = {
            "quality_score": 0.92,
            "defects_detected": [],
            "quality_grade": "A",
            "recommendations": ["Product meets export standards"],
            "processing_metadata": {
                "filename": file.filename,
                "file_size": file.size if hasattr(file, 'size') else 0,
                "processing_time": "0.8s"
            }
        }
        
        return JSONResponse(content=quality_result)
    
    except Exception as e:
        logger.error(f"Quality check error: {str(e)}")
        raise HTTPException(status_code=500, detail="Quality check failed")

# NLP for trade communication
@app.post("/api/ai/nlp/translate")
async def translate_document(data: Dict[str, Any]):
    """
    Translate trade documents using NLP models
    """
    try:
        translation_result = {
            "translated_text": "This is a simulated translation of the trade document.",
            "source_language": data.get("source_lang", "auto-detected"),
            "target_language": data.get("target_lang", "english"),
            "confidence": 0.94,
            "word_count": 150,
            "processing_time": "0.5s"
        }
        
        return JSONResponse(content=translation_result)
    
    except Exception as e:
        logger.error(f"Translation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Translation failed")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
