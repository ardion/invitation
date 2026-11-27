# Server lokal untuk mencoba situs. Sama seperti `python3 -m http.server`,
# tapi browser selalu mengambil file terbaru (tanpa cache) dan antrean
# koneksinya lebih besar, supaya banyak file yang diminta bersamaan tidak putus.
import http.server, os, sys

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, *args):
        pass

class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
Server(('127.0.0.1', port), NoCache).serve_forever()
