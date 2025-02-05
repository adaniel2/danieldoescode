# ---------
# Stage 1: Build the React App using Node
# ---------
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy the rest of the app code
    COPY . .
    
    # Build the app (adjust if your build script differs)
    RUN npm run build
    
    # ---------
    # Stage 2: Serve the Build with Nginx
    # ---------
    FROM nginx:stable-alpine
    
    # Remove the default Nginx static assets
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copy the production build from the builder stage
    # (Assuming Vite outputs to the "dist" folder)
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # (Optional) Use a custom Nginx configuration if needed.
    # For example, if you need to handle client-side routing:
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose port
    EXPOSE 8081
    
    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]