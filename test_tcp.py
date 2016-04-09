import socket

s = socket.socket()
s.connect(('localhost', 5000))

s.send('Hello')