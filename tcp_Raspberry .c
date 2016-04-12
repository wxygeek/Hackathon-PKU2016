#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>  /* netdb is necessary for struct hostent */

#define PORT 5000  /* server port */

#define MAXDATASIZE 10

int main(int argc, char *argv[])
{
    int sockfd, num;    /* files descriptors */
    char buf[MAXDATASIZE];    /* buf will store received text */
    struct hostent *he;    /* structure that will get information about remote host */
    struct sockaddr_in server;
    
    
    if((he=gethostbyname("192.168.1.123"))==NULL)
    {
        printf("gethostbyname() error\n");
        exit(1);
    }
    
    if((sockfd=socket(AF_INET,SOCK_STREAM, 0))==-1)
    {
        printf("socket() error\n");
        exit(1);
    }
    bzero(&server,sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(PORT);
    server.sin_addr = *((struct in_addr *)he->h_addr);
    if(connect(sockfd, (struct sockaddr *)&server, sizeof(server))==-1)
    {
        printf("connect() error\n");
        exit(1);
    }
　　
　　char str[] = "raspberry\n";

    if((num=send(sockfd,str,sizeof(str),0))==-1){
        printf("send() error\n");
        exit(1);
    }
    while((num=recv(sockfd,buf,MAXDATASIZE,0))!=-1)
    {
        buf[num-1]='\0';
        printf("server message: %s\n",buf);
        
    }
    printf("recv() error\n");
    exit(1);
    close(sockfd);
    return 0;
}