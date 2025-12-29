#!/usr/bin/env python3
"""
Servidor local simple para el proyecto de telecomunicaciones
Ejecutar con: python server.py
Luego abrir: http://localhost:8000
"""

import http.server
import socketserver
import json
import os
from urllib.parse import urlparse, parse_qs

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        # Si es una petición a un archivo JSON, servirlo con el header correcto
        if self.path.endswith('.json'):
            try:
                file_path = self.path[1:]  # Remover el '/' inicial
                if os.path.exists(file_path):
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
                    return
            except Exception as e:
                self.send_response(404)
                self.end_headers()
                return
        
        # Para otros archivos, usar el comportamiento por defecto
        super().do_GET()

    def do_POST(self):
        # Manejar actualizaciones de datos
        if self.path.startswith('/api/'):
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                # Determinar qué archivo actualizar basado en la URL
                if 'clientes' in self.path:
                    with open('data/clientes.json', 'w', encoding='utf-8') as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)
                elif 'tareas' in self.path:
                    with open('data/tareas.json', 'w', encoding='utf-8') as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)
                elif 'nucleo' in self.path:
                    with open('data/nucleo.json', 'w', encoding='utf-8') as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                return
        
        super().do_POST()

if __name__ == "__main__":
    PORT = 8000
    
    print(f"🚀 Iniciando servidor en http://localhost:{PORT}")
    print("📱 Abre tu navegador y ve a: http://localhost:8000")
    print("⏹️  Presiona Ctrl+C para detener el servidor")
    print("-" * 50)
    
    with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor detenido")
