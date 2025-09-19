import { NextResponse } from 'next/server';
import  { NextRequest } from 'next/server';

export default function middleware (request : NextRequest) {

    return NextResponse.redirect(new URL('/login', request.url));
  
}

export const config ={
  matcher:['/'],
}