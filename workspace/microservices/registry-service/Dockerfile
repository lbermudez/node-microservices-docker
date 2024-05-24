FROM registry.access.redhat.com/ubi8/nodejs-20:latest

# Set the working directory
WORKDIR /opt/app-root/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Set user to root to install npm packages
USER root

# Install npm production packages 
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Change ownership of the application files to the default user
RUN chown -R 1001:0 /opt/app-root/src

# Switch back to the default user
USER 1001

# Set environment variables
ENV NODE_ENV production
ENV PORT 3080

# Expose the port the app runs on
EXPOSE 3080

# Command to run the application
CMD ["npm", "start"]
