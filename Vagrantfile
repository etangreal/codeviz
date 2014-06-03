
# ---------------------------------------------------------------------------------------------------------------------
# DEFINITIONS
# ---------------------------------------------------------------------------------------------------------------------

API_VERSION = 2

BOX_NAME    = "coreos-alpha"
BOX_VERSION = ">= 324.3.0"
BOX_URL     = "http://storage.core-os.net/coreos/amd64-usr/alpha/coreos_production_vagrant.json"

VM_NAME     = "coreOS"

$VB_GUI     = FALSE
$VB_MEMORY  = 1024
$VB_CPUS    = 1

# ---------------------------------------------------------------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------------------------------------------------------------

Vagrant.configure(API_VERSION) do |config|

  if Vagrant.has_plugin?("vagrant-vbguest") then
    config.vbguest.auto_update = false
  end

  config.vm.box         = BOX_NAME
  config.vm.box_version = BOX_VERSION
  config.vm.box_url     = BOX_URL

  config.vm.hostname    = VM_NAME

  config.ssh.forward_agent = true

  config.vm.provider :virtualbox do |vb|
    vb.gui    = $VB_GUI
    vb.memory = $VB_MEMORY
    vb.cpus   = $VB_CPUS
  end

  ip = "172.17.8.100"
  config.vm.network :private_network, ip: ip
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Enable NFS for sharing the host machine into the coreos-vagrant VM.
  config.vm.synced_folder ".", "/home/core/share", id: "core", :nfs => true, :mount_options => ['nolock,vers=3,udp']

  config.vm.provision "shell", inline: "docker build /home/core/share/docker", run: "once"

  # config.vm.provision "shell" do |s|
  #  s.inline = ""
  #  s.path   = "setup.sh"
  #  s.run    = "once"
  # end

end

# ---------------------------------------------------------------------------------------------------------------------
