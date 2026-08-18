from functools import partial
from http.server import SimpleHTTPRequestHandler
from pathlib import Path
from socketserver import ThreadingTCPServer
import webbrowser


ROOT = Path(__file__).resolve().parent
PORT = 5501


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


handler = partial(QuietHandler, directory=str(ROOT))
ThreadingTCPServer.allow_reuse_address = True

with ThreadingTCPServer(("127.0.0.1", PORT), handler) as server:
    webbrowser.open(f"http://127.0.0.1:{PORT}/index.html")
    server.serve_forever()
