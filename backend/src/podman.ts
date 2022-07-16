export interface ContainerInfo {
  image: string;
  name: string;
  ports: [string, number][];
  env: Record<string, string>;
}

export class PodmanApi {
  constructor(public readonly baseUrl = "http://localhost:8888") {}

  async pull(image: string) {
    const response = await fetch(
      `${this.baseUrl}/v1.0.0/images/create?fromImage=${encodeURIComponent(
        image
      )}`,
      {
        method: "POST",
      }
    );

    return await response.json();
  }

  async createContainer(containerInfo: ContainerInfo) {
    const response = await fetch(`${this.baseUrl}/v1.0.0/containers/create`, {
      method: "POST",
      body: JSON.stringify({
        ...containerInfo,
        HostConfig: {
          PortBindings: containerInfo.ports
            ? Object.fromEntries(
                containerInfo.ports.map((port) => [
                  `${port[0]}`,
                  [{ HostPort: port[1].toString() }],
                ])
              )
            : {},
        },
      }),
    });

    return await response.json();
  }
}
