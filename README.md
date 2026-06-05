# Ashby API Proxy

A lightweight Vercel proxy that lets the Claude hiring dashboard call the Ashby API securely from the browser.

## Deploy to Vercel

1. Go to https://vercel.com and sign up (free)
2. Click "Add New Project"
3. Upload this folder or connect via GitHub
4. Click Deploy — no configuration needed

## How it works

- Your browser sends requests to this proxy with your Ashby API key in the `x-ashby-key` header
- The proxy forwards the request to Ashby's API server-side (no CORS issues)
- Only a safe allowlist of read endpoints are permitted

## Endpoints proxied
- job.list
- application.list
- candidate.list
- jobPosting.list
- interview.list
- offer.list
- department.list
- location.list
