# Reflection — DSO101 Assignment 1 
 
---
 
## Overview
 
This assignment introduced me to the practical side of Continuous Integration and Continuous Deployment (CI/CD) through hands-on experience with Docker, Docker Hub, and Render. The goal was to containerize a fullstack to-do application and deploy it to the cloud both manually and through automated pipelines.
 
---
 
## What I Did
 
I built a fullstack to-do application consisting of:
- A **React** frontend for adding, editing, and deleting tasks
- A **Node.js/Express** backend providing a CRUD REST API
- A **PostgreSQL** database for persistent task storage
I then containerized both services using Docker, pushed the images to Docker Hub with my student ID as the tag, and deployed them on Render. In Part B, I connected my GitHub repository directly to Render so that every new git push automatically triggers a fresh build and deployment.
 
---
 
## Challenges I Faced
 
### 1. Docker Build Error — Missing `package.json`
The first major issue I encountered was during the Docker build step. The build failed with:
```
npm error enoent Could not read package.json
```
After investigation, I realised I was running `docker build` from the wrong directory I was in the project root instead of inside the `backend/` folder. The fix was simple: navigate into the correct folder before running the build command. This taught me that the `.` (dot) in `docker build .` refers to the **current directory as the build context**, so the directory you run it from matters.
 
### 2. Docker Push Failed — Network Interruption
When pushing my backend image to Docker Hub, the push failed mid-way with a `400 Bad Request` error on one of the layers. This was caused by a network interruption during the large layer upload. I resolved it by logging out and back into Docker Hub to refresh the authentication token, then rerunning the push. Docker was smart enough to skip already uploaded layers and only retry the failed one.
 
### 3. Render Blueprint Requires Payment
When attempting to use the `render.yaml` Blueprint feature for Part B, I discovered it required a paid Render plan. I adapted by connecting each service (frontend and backend) directly to my GitHub repository through Render's web interface. This achieved the same outcome automatic deployment on every git push — without needing the Blueprint feature. This was a good lesson in problem solving and finding alternative approaches when a planned method is unavailable.
 
### 4. Environment Variables Management
Understanding how to properly manage environment variables across different environments (local, production) was initially confusing. I learned the importance of:
- Using `.env` for local development
- Using Render's environment variable dashboard for production secrets
- Never committing `.env` files to Git by adding them to `.gitignore`
---
 
## What I Learned
 
### CI/CD Concepts
This assignment gave me my first real experience with CI/CD in practice. Before this, CI/CD was just a concept I had read about. Seeing Render automatically trigger a new build and deployment every time I pushed a commit to GitHub made the concept click. It is clear how this would save enormous amounts of time in a real development team no manual deployment steps, no human error in the release process.
 
### How Docker Works
I gained a solid understanding of how Docker containerizes applications. Writing Dockerfiles taught me about image layers, build context, and how each `COPY`, `RUN`, and `CMD` instruction creates a new layer. I also learned about multi-stage builds for the frontend using one stage to compile the React app and another lightweight nginx stage to serve it which significantly reduces the final image size.
 
### Cloud Deployment
Deploying to Render showed me how modern cloud platforms work. I now understand how web services, managed databases, and environment configuration all connect together in a production environment.
 
---
 
## What I Would Do Differently
 
- I would set up a `docker-compose.yml` file for local development from the start, so all three services (frontend, backend, database) can be started with a single command during development.
- I would test the Docker build locally before writing the Dockerfile to avoid guessing at paths and directory structures.
- I would read platform pricing and plan limitations (like Render's Blueprint feature) before designing my deployment workflow around them.
---
 
## Conclusion
 
This assignment was challenging but rewarding. The errors I encountered the missing `package.json`, the failed push, the Blueprint paywall were frustrating in the moment but valuable in hindsight. Each problem forced me to read documentation, understand what was actually happening under the hood, and find a working solution independently. These are exactly the kinds of skills that matter in real software engineering work. I now feel confident containerizing an application with Docker and deploying it to a cloud platform with automated CI/CD pipelines.