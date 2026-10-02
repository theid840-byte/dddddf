$port = 8080
$path = "c:\Users\p\Desktop\rahat khan web"

$code = @"
using System;
using System.Net;
using System.IO;
using System.Threading;

public class WebServer {
    public static void Start() {
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/");
        listener.Prefixes.Add("http://192.168.0.102:8080/");
        listener.Start();
        Console.WriteLine("Listening on http://localhost:8080/");
        
        while (true) {
            try {
                HttpListenerContext context = listener.GetContext();
                string reqPath = context.Request.Url.LocalPath;
                if (reqPath == "/") reqPath = "/index.html";
                string filePath = @"$path" + reqPath.Replace("/", "\\");
                
                if (context.Request.HttpMethod == "POST" && reqPath == "/api/save") {
                    using (StreamReader reader = new StreamReader(context.Request.InputStream, context.Request.ContentEncoding)) {
                        string body = reader.ReadToEnd();
                        File.WriteAllText(Path.Combine(@"$path", "data.json"), body);
                    }
                    context.Response.StatusCode = 200;
                    byte[] responseBytes = System.Text.Encoding.UTF8.GetBytes("{\"success\":true}");
                    context.Response.ContentType = "application/json";
                    context.Response.ContentLength64 = responseBytes.Length;
                    context.Response.OutputStream.Write(responseBytes, 0, responseBytes.Length);
                    context.Response.OutputStream.Close();
                    continue;
                }

                if (File.Exists(filePath)) {
                    byte[] buffer = File.ReadAllBytes(filePath);
                    if (filePath.EndsWith(".html")) context.Response.ContentType = "text/html";
                    else if (filePath.EndsWith(".css")) context.Response.ContentType = "text/css";
                    else if (filePath.EndsWith(".js")) context.Response.ContentType = "application/javascript";
                    else if (filePath.EndsWith(".json")) context.Response.ContentType = "application/json";
                    
                    context.Response.ContentLength64 = buffer.Length;
                    context.Response.OutputStream.Write(buffer, 0, buffer.Length);
                } else {
                    context.Response.StatusCode = 404;
                }
                context.Response.OutputStream.Close();
            } catch (Exception) {}
        }
    }
}
"@
Add-Type -TypeDefinition $code
[WebServer]::Start()
