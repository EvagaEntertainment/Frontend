# 🎯 Custom Events API Integration Guide

## 📋 Overview
This document provides complete API integration details for the Custom Events system, including endpoints, request/response formats, and frontend integration patterns.

## 🏗️ Backend API Structure

### **Base URL**: `/api/customEvents`

### **1. Public Access Routes (No Authentication Required)**

#### **GET** `/customEvents/public`
- **Description**: Get all active custom events for public access
- **Query Parameters**: 
  - `page` (optional): Page number for pagination
  - `limit` (optional): Items per page
  - `eventType` (optional): Filter by event type
- **Response**: List of active custom event templates

#### **GET** `/customEvents/public/type/:eventType`
- **Description**: Get public custom events by event type
- **Path Parameters**: `eventType` (string)
- **Query Parameters**: Same as above
- **Response**: Filtered list of custom event templates

#### **GET** `/customEvents/public/:id`
- **Description**: Get public custom event template by ID
- **Path Parameters**: `id` (string)
- **Response**: Single custom event template

### **2. User & Admin Accessible Routes (Authentication Required)**

#### **GET** `/customEvents`
- **Description**: Get all custom event templates with pagination and filters
- **Authentication**: `verifyJwt(["user", "admin"])`
- **Query Parameters**:
  - `page` (optional): Page number
  - `limit` (optional): Items per page
  - `eventType` (optional): Filter by event type
  - `status` (optional): Filter by status (active/inactive)
- **Response**: Paginated list of custom event templates

#### **GET** `/customEvents/type/:eventType`
- **Description**: Get custom events by event type
- **Authentication**: `verifyJwt(["user", "admin"])`
- **Path Parameters**: `eventType` (string)
- **Query Parameters**: Same as above
- **Response**: Filtered list of custom event templates

#### **GET** `/customEvents/:id`
- **Description**: Get custom event template by ID
- **Authentication**: `verifyJwt(["user", "admin"])`
- **Path Parameters**: `id` (string)
- **Response**: Single custom event template

#### **GET** `/customEvents/:id/theme-cards`
- **Description**: Get theme card images from a template
- **Authentication**: `verifyJwt(["user", "admin"])`
- **Path Parameters**: `id` (string)
- **Response**: Theme card images and data

#### **POST** `/customEvents/validate`
- **Description**: Validate form data against a template
- **Authentication**: `verifyJwt(["user", "admin"])`
- **Request Body**: Form data to validate
- **Response**: Validation results

### **3. Admin Only Routes (Admin Authentication Required)**

#### **POST** `/customEvents`
- **Description**: Create a new custom event template
- **Authentication**: `verifyJwt(["admin"])`
- **Middleware**: 
  - `uploadToS3WithEncoded("customEvents", ["image/png", "image/jpg", "image/jpeg", "image/webp"])`
  - `processImagePreview`
- **Request Body**: FormData with custom event template
- **Response**: Created custom event template

#### **PUT** `/customEvents/:id`
- **Description**: Update custom event template
- **Authentication**: `verifyJwt(["admin"])`
- **Path Parameters**: `id` (string)
- **Request Body**: FormData with updated template
- **Response**: Updated custom event template

#### **DELETE** `/customEvents/:id`
- **Description**: Delete custom event template (soft delete)
- **Authentication**: `verifyJwt(["admin"])`
- **Path Parameters**: `id` (string)
- **Response**: Success message

#### **GET** `/customEvents/stats`
- **Description**: Get template statistics
- **Authentication**: `verifyJwt(["admin"])`
- **Response**: Statistics data

#### **PUT** `/customEvents/:templateId/theme-card/:fieldIndex/:optionIndex/image`
- **Description**: Update theme card image
- **Authentication**: `verifyJwt(["admin"])`
- **Path Parameters**: 
  - `templateId` (string)
  - `fieldIndex` (number)
  - `optionIndex` (number)
- **Middleware**: Same as POST
- **Request Body**: FormData with new image
- **Response**: Updated theme card

## 📊 Request/Response Data Structures

### **Custom Event Template Structure**

```json
{
  "_id": "string",
  "eventType": "string",
  "template": "string",
  "templateName": "string",
  "formFields": [
    {
      "id": "string",
      "name": "string",
      "label": "string",
      "type": "string",
      "required": "boolean",
      "placeholder": "string",
      "options": "array",
      "validation": {
        "min": "string",
        "max": "string",
        "pattern": "string"
      }
    }
  ],
  "status": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### **Field Types Supported**

1. **Basic Types**: `text`, `number`, `email`, `phone`, `date`, `time`
2. **Selection Types**: `select`, `radio`, `checkbox`
3. **Advanced Types**: `textarea`, `file`, `url`
4. **Custom Types**: `themeCards`, `foodMenu`

### **Theme Cards Structure**

```json
{
  "type": "themeCards",
  "options": [
    {
      "name": "string",
      "image": "string (base64 or URL)",
      "description": "string"
    }
  ]
}
```

### **Food Menu Structure**

```json
{
  "type": "foodMenu",
  "options": [
    {
      "categoryName": "string",
      "items": [
        {
          "name": "string",
          "price": "number",
          "description": "string",
          "dietaryType": "string (veg|non-veg|vegan|egg|seafood|jain)",
          "spiceLevel": "string (mild|medium|hot|extra-hot)",
          "isPopular": "boolean"
        }
      ]
    }
  ]
}
```

## 🔧 Frontend Integration

### **API Service Files Created**

1. **`src/services/customEventsApi.js`** - Dedicated custom events API service
2. **`src/services/apiEndpoints.js`** - Updated with custom events endpoints
3. **`src/services/commonApis.js`** - Added custom events functions
4. **`src/services/adminActionsApi.js`** - Added admin custom events functions

### **Usage in Components**

```javascript
import customEventsApi from "../../services/customEventsApi";
import { useServices } from "../../hooks/useServices";

// Initialize API hooks
const getCustomEventsApi = useServices(customEventsApi.getCustomEvents);
const createCustomEventApi = useServices(customEventsApi.createCustomEvent);
const deleteCustomEventApi = useServices(customEventsApi.deleteCustomEvent);

// Use in functions
const getCustomEventsHandle = async () => {
  try {
    const queryParams = { page: page || 1 };
    const response = await getCustomEventsApi.callApi(queryParams);
    
    if (response && response.data) {
      setAllCustomEvents(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    }
  } catch (error) {
    console.error('Error fetching custom events:', error);
    toast.error('Failed to fetch custom events');
  }
};
```

### **Error Handling & Fallbacks**

The frontend includes fallback mechanisms:
- **API First**: Attempts real API calls first
- **Mock Fallback**: Falls back to mock data if API fails
- **User Feedback**: Toast notifications for success/error states
- **Console Logging**: Detailed error logging for debugging

## 🚀 Implementation Steps

### **Phase 1: Backend Setup**
1. Create `customEvents.controller.js` with all CRUD operations
2. Create `customEvents.model.js` with MongoDB schemas
3. Create `customEvents.routes.js` with all endpoints
4. Implement middleware for image uploads and JWT verification

### **Phase 2: Database Schema**
1. **CustomEvent Template**: Main template collection
2. **Form Fields**: Embedded or referenced field definitions
3. **Theme Cards**: Image storage and metadata
4. **Food Menu**: Category and item structures

### **Phase 3: Frontend Integration**
1. Replace mock API calls with real endpoints
2. Implement proper error handling
3. Add loading states and user feedback
4. Test all CRUD operations

### **Phase 4: Testing & Optimization**
1. Test all endpoints with Postman/Thunder Client
2. Validate image uploads and processing
3. Test pagination and filtering
4. Performance optimization and caching

## 📝 Notes

- **Image Handling**: Uses S3 with base64 encoding for theme cards
- **Authentication**: JWT-based with role-based access control
- **Validation**: Form data validation against template schemas
- **Pagination**: Standard pagination with page/limit parameters
- **Soft Delete**: Templates are soft-deleted, not permanently removed
- **Fallback System**: Frontend gracefully handles API failures

## 🔗 Related Files

- **Frontend**: `src/components/Admin/AdminCustomEvent.js`
- **API Service**: `src/services/customEventsApi.js`
- **Endpoints**: `src/services/apiEndpoints.js`
- **Common APIs**: `src/services/commonApis.js`
- **Admin APIs**: `src/services/adminActionsApi.js`

---

**Ready for Backend Development! 🎉**


